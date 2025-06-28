import { goto } from "$app/navigation";


export default function useShowalert() {
  let alert = {
   message: "",
   success: true as boolean,
   redirectUrl: "",
  };

//    console.log("useShowalert", alert);

  const showAlert = (url: string) => {
  
    const message = document.getElementById("alert");


    if (message) {
      message.style.display = "block";
    }

    setTimeout(function () {
      

        if (message) {
          message.style.display = "none"; // Hide the alert
        }
        // navigate(`${alert?.redirectUrl}`);
        goto(url); // Redirect to profile page on successful login
    
    }, 3000); // 20000 milliseconds = 20 seconds
  };

  return { alert, showAlert };
}