import axios from "axios";
import { useAtom } from "jotai";
import { loadingAtom, messageAtom } from "../store/global-atoms";
import { useNavigate } from "react-router-dom";
import { QuestionApi } from "../api/question-api";

export const useAxiosServiceClient = () => {
  const navigate = useNavigate();
  const [,setMessage] = useAtom(messageAtom)
  const [, setLoading] = useAtom(loadingAtom);

  const axiosClient = axios.create({
    withCredentials:true
  })

  axiosClient.interceptors.request.use((config) => {
    setLoading(true);
    console.log("req: ", config);
    return config;
  });

  axiosClient.interceptors.response.use(
    (response) => {
      if (!response.data.success) {
        setLoading(false);
        return Promise.reject(response);
      }
      setLoading(false);
      return response;
    },
    (error) => {
      console.log("error on response: ", error);
      console.log("response: ", error.response.status);
      if(error.response.status === 403){
        setMessage({
          type:"warning",
          message:"Bu işlem için yetkiniz bulunmamaktadır. Lütfen Giriş Yapın"
        })
        navigate('/')
      }
      setLoading(false);
      return Promise.reject(error);
    }
  );

  const services = {
    QuestionApi: new QuestionApi(axiosClient),
  }

  return {
    ...services
  }

};