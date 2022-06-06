import axios from "axios";

export class Doc {
  
  static async convertDoc(formData) {

    return await axios.post("/doc-handler/convert-doc", formData, {headers: {"Content-Type": "multipart/form-data"}});
      
  };

  static async getDoc(slug) {

    return await axios.get("/doc-handler/get-doc/" + slug);

  };

};