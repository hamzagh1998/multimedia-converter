import axios from "axios";

export class Image {
  
  static async convertImage(formData) {

    return await axios.post("/image-handler/convert-image", formData, {headers: {"Content-Type": "multipart/form-data"}});
      
  };

  static async getImage(slug) {

    return await axios.get("/image-handler/get-image/" + slug);

  };

};