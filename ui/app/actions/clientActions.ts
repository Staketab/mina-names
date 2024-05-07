import axios from "axios";

export async function pinFile(formData): Promise<string> {  
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_IPFS_URL,
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_IPFS_KEY,
        },
      }
    );
    if (response && response.data && response.data.IpfsHash) {
      return response.data.IpfsHash;
    } else {
      console.error("pinFile error", response.data.error);
      return undefined;
    }
  } catch (err) {
    console.error("pinFile error 2 - catch", err);
    return undefined;
  }
}
