function openForm(i) {
  if (i==1)
    document.getElementById("myForm").style.display = "block";
  else document.getElementById("myFormC").style.display = "block";
  }
  
  function closeForm(i) {
    if (i==1)
    document.getElementById("myForm").style.display = "none";
    else 
    document.getElementById("myFormC").style.display = "none";
  }
  
  // const out = document.getElementById("form-container");
  // let c = 0;
  // setInterval(function() {
  //     // allow 1px inaccuracy by adding 1
  //     const isScrolledToBottom = out.scrollHeight - out.clientHeight >= out.scrollTop + 1;
  
  //     // scroll to bottom if isScrolledToBottom is true
  //     if (isScrolledToBottom) {
  //       out.scrollTop = out.scrollHeight - out.clientHeight;
  //     }
  // }, 500)
  
 function openClientM(){
    openForm(2);

  }