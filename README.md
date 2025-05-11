# Untoastify

**Untoastify** is a lightweight, customizable, and efficient alternative to `react-toastify` for toast notifications in React applications. It's simple to use, with minimal styling, but offers flexibility for easy customization.

---

## 🚀 Installation

To install **untoastify**, run the following npm command:

npm install untoastify

## Toast Provider set up

// in your root layout.js

<pre>import { ToastProvider } from "untoastify";

// then wrap your app component inside the toast provider

< ToastProvider >
App // your app main component
< /ToastProvider ></pre>

## Basic usage

<pre> import { useToast } from "untoastify";

    const MyComponent = () => { 
        const toast = useToast(); 
        
        const handleClick = () => { 
            toast.showToast({ 
                message: "Show information toast!", 
                type: "info", 
                position: "top-right", 
                duration: 3000, }); }; 

    return ( 
        < button > onClick={handleClick}> Toast Me < /button > 
        ); 
    }; 
export default MyComponent;</pre>

## Props

message (required. will show a dummy message if not provided): The message content to display.

type (optional): the type of the message. (values: error, info, success, warning).

position (optional. default to top-right): Toast position on screen (values: top-left, top-right, bottom-left, bottom-right).

duration: the duration the toast should display in miliseconds (ms). Default to 4000 ms.

## Development/modification and contribution

git clone https://github.com/clouds440/untoastify.git

cd untoastify

## 📦 License

GNU Affero General Public License v3.0 - see the LICENSE file for details.
