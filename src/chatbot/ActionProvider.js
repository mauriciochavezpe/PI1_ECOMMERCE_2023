// ActionProvider starter code
import axios from "axios";

class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;
  }
  handleHello1 = (mesage = "") => {
    const botMessage = this.createChatBotMessage("Hello. Nice to meet you.");

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  async handleHello(message = "") {
    let sURL = process.env.REACT_APP_URL_ALL + "/chat";
    let obj = { question: message };
    /*let config = {
      method: "POST",
      sURL,
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("TOKEN_COGNITO")).oauth2,
      },
      data: obj,
    };*/
 

    let response = await axios.post(sURL, obj, {
      headers: {
        "Content-type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem("TOKEN_COGNITO")).oauth2,
      },
    });
    // const response = await axios.request(config); // Use the relative path to your API endpoint
    const data = await response;
    console.log(data);
    let rpta = data.data.response;
    let iValidate = [null, 0, undefined, ""];
    let body = iValidate.includes(rpta)
      ? "Puedes intentar con otra solicitud"
      : rpta;
    const message1 = this.createChatBotMessage(body);

    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message1],
    }));
  }
}

{
  /*
const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {},
        });
      })}
    </div>
  );
};*/
}

export default ActionProvider;
