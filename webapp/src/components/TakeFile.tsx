import { ChangeEvent, useState } from 'react';

const TakeFile = () => {
  const [archivo, setArchivo] = useState<File>();

  const actualizaArchivo = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
        if(e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png")
            setArchivo(e.target.files[0]);
        else
            setArchivo(undefined);
    }
  };

  return (
    <div>
      Sube tu foto de perfil: <input type="file" onChange={actualizaArchivo} />
      <div>{archivo && `${archivo.name} - ${archivo.type}`}</div>
      <div>{!archivo && "El archivo debe tener la extensión .jpg o .png"}</div>
    </div>
  );
}

export default TakeFile;