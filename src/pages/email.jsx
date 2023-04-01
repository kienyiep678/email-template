import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { createEmail, reset } from "../features/email/emailSlice";
import { createFile, fileReset } from "../features/file/fileSlice";

function App() {
  const [formData, setFormData] = useState({
    emailAdd: "",
    emailAddCC: "",
    subject: "",
    body: "",
    attachment: "",
  });
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, email, message } = useSelector(
    (state) => state.email
  );
  const [attachData, setAttachData] = useState("");
  const { fileLoading, fileError, fileSuccess, fileData, fileMessage } =
    useSelector((state) => state.file);

  useEffect(() => {
    if (fileError) {
      toast.error(fileMessage);
    }
    if (isError) {
      toast.error(message);
    }

    // Redirect when logged in
    if (isSuccess) {
      toast.success(email);
      dispatch(reset());
    }
    // if (fileSuccess) {
    // if (fileData !== "") {
    //   toast.success(fileData);
    // }

    // setFormData((prevState) => ({
    //   ...prevState,
    //   attachment: fileData,
    // }));
    //   dispatch(fileReset());
    // }
  }, [
    isError,
    isSuccess,
    message,
    email,
    fileData,
    fileError,
    fileSuccess,
    fileMessage,
    dispatch,
  ]);

  const { emailAdd, emailAddCC, subject, body, attachment } = formData;

  const formData2 = new FormData();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeFile = (e) => {
    console.log("target name", e.target.files[0]);
    formData2.append("file", e.target.files[0]);

    if (!e.target.files[0]) {
      setAttachData("");
      setFormData((prevState) => ({
        ...prevState,
        attachment: "",
      }));
    }

    if (e.target.files[0]) {
      setAttachData(e.target.files[0]);
      dispatch(createFile(formData2));
    }
  };

  const onSubmit = (e) => {
    let userData = {};
    e.preventDefault();

    if (attachData) {
      console.log("attach data name: ", attachData.name);
      userData = {
        emailAdd,
        emailAddCC,
        subject,
        body,
        attachment: attachData.name,
      };
    } else {
      userData = {
        emailAdd,
        emailAddCC,
        subject,
        body,
        attachment: "",
      };
    }

    dispatch(createEmail(userData));
  };

  return (
    <>
      <div className="form-container">
        <div className="form">
          <form onSubmit={onSubmit} encType="multipart/form-data" method="POST">
            <div className="form-group">
              <label htmlFor="emailAdd">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="emailAdd"
                name="emailAdd"
                value={emailAdd}
                onChange={onChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailAddCC">Email Address CC</label>
              <input
                type="email"
                className="form-control"
                id="emailAddCC"
                name="emailAddCC"
                value={emailAddCC}
                onChange={onChange}
                placeholder="Enter your email cc"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                className="form-control"
                id="subject"
                name="subject"
                value={subject}
                onChange={onChange}
                placeholder="Enter subject"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Body</label>
              <textarea
                name="body"
                id="body"
                className="form-control"
                placeholder="body"
                value={body}
                onChange={onChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="myFile">Select a file</label>
              <input
                type="file"
                id="attachment"
                name="attachment"
                onChange={onChangeFile}
              ></input>
            </div>

            <div className="form-group">
              <button className="btn btn-notification">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
