import axios from "axios";

const upload = async (file, onProgress) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "aijsiaij");

  const config = {
    onUploadProgress: (progressEvent) => {
      const progress = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      console.log(progress);
      onProgress(progress);
    },
    withCredentials: false,
  };

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dbi3rrybd/auto/upload",
      data,
      config
    );
    const { url } = response.data;
    return url;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default upload;
