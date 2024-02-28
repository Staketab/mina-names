export { IPFS };
import axios from "axios";
import FormData from "form-data";

class IPFS {
  private auth: string;

  constructor(token: string) {
    this.auth = "Bearer " + token;
  }

  public async pinString(data: string): Promise<string | undefined> {
    try {
      // replacer will remove all private metadata from the object
      //const data = JSON.stringify(params, replacer, 2);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: this.auth,
        },
      };

      if (this.auth === "Bearer ")
        //for running tests
        return `QmTosaezLecDB7bAoUoXcrJzeBavHNZyPbPff1QHWw8xus`;

      const res = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        data,
        config
      );

      console.log("pinJSON result:", res.data);
      return res.data.IpfsHash;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  }

  public async pinFile(
    stream: NodeJS.ReadableStream,
    filename: string,
    size: number,
    mimeType: string
  ): Promise<string | undefined> {
    try {
      const formData = new FormData();

      // append stream with a file
      formData.append("file", stream, {
        contentType: mimeType,
        knownLength: size,
        filename,
      });

      if (this.auth === "Bearer ")
        //for running tests
        return `QmaRZUgm2GYCCjsDCa5eJk4rjRogTgY6dCyXRQmnhvFmjj`;

      const response = await axios.post(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        formData,
        {
          headers: {
            Authorization: this.auth,
            ...formData.getHeaders(),
          },
          maxBodyLength: 25 * 1024 * 1024,
        }
      );

      console.log("pinFile result:", response.data);
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
    return undefined;
  }
}
