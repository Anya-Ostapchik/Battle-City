function response(){
    async function getUsers(){
        try{
            const response = await fetch('http://localhost:9090/users');
            const data = await response.json();
            listUsers(data);
        } catch(error){
            console.error("Error:", error);
        }
    }

    function listUsers(users){
        const table = document.querySelector('.statistics__table');
        console.log(users);
        if(users.lenght){
            
            table.getElementsByClassName.display = 'block';
        }else{
            table.getElementsByClassName.display = 'none';
        }
    }

    getUsers();
}