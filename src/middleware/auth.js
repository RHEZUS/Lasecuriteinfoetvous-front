import apiClient from "@/plugins/axios";
export default async function auth ({ next, store }){
    const response = await apiClient.get(`/api/user`).then(response =>{
        console.log(response);
        return next()
    }).catch((error) =>{
      console.log(error);
      return next({ name: "Login" });
    });
}
