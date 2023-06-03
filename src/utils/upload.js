import axios from "axios";

const upload = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "aijsiaij");
  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dbi3rrybd/image/upload",
      data,
      {
        withCredentials: false,
      }
    );
    const { url } = await res.data;
    return url;
  } catch (err) {
    console.log(err);
  }
};
export default upload;
