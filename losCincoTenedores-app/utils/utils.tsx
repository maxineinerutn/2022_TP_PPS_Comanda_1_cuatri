export const sleep = (miliseconds:number=1000) =>  {
    return new Promise(resolve => 
        setTimeout(resolve, miliseconds)
    );
}

export const getBlob = async (image: string) => {
    return await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
        resolve(xhr.response);
    };
    xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", image, true);
    xhr.send(null);
})};

export const splitUserFromEmail = (email:string) => {
    const emailUser = email.split('@')[0];
    return emailUser.charAt(0).toUpperCase() + emailUser.slice(1)
}

export const AcceptEmail = ({ user }) => ({
    subject: `USUARIO APROBADO`,
    body: (
      <div>
        <p>Hola {user}, su usuario se encuentra habilitado</p>
      </div>
    )
  })

  export const RejectEmail = ({ user, motive }) => ({
    subject: `USUARIO RECHAZADO`,
    body: (
      <div>
        <p>Hola {user}, su usuario fue rechazado por los siguientes motivos:</p>
        <p>{motive}</p>

      </div>
    )
  })