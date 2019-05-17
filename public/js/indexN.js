
window.onload = () => {
    const userId = Cookies.get('userId');
  
    if (!userId) {
        window.location.href = './LoginNutri.html';
    } else {
    }
}