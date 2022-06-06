import axios from "axios";

export class Video {
  
  static async convertVideo(formData) {

    return await axios.post("/video-handler/convert-video", formData, {headers: {"Content-Type": "multipart/form-data"}});
      
  };

  static async getVideo(slug) {

    return await axios.get("/video-handler/get-video/" + slug);

  };

};