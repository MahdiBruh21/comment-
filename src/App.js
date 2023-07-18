import { useEffect, useState } from "react";
import "./App.css";
import { Welcome } from "./components/com";
import { Auth } from "./components/auth";
import { db, auth, storage } from "./config/fire";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
function App() {
  const [ProfesseurList, setProfesseurList] = useState([]);

  // New Professeur States
  const [newProfesseurTitle, setNewProfesseurTitle] = useState("");
  const [newInscrit, setNewInscrit] = useState(0);
  const [isNewProfesseur, setisNewProfesseur] = useState(false);

  // Update Title State
  const [updatedTitle, setUpdatedTitle] = useState("");

  // File Upload State

  const ProfesseursCollectionRef = collection(db, "Professeurs");

  const getProfesseurList = async () => {
    try {
      const data = await getDocs(ProfesseursCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProfesseurList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitProfesseur = async () => {
    try {
      await addDoc(ProfesseursCollectionRef, {
        title: newProfesseurTitle,
        inscription: newInscrit,
        isProf: isNewProfesseur,
        userId: auth?.currentUser?.uid,
      });
      getProfesseurList();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProfesseur = async (id) => {
    const ProfesseurDoc = doc(db, "Professeurs", id);
    await deleteDoc(ProfesseurDoc);
  };

  const updateProfesseurTitle = async (id) => {
    const ProfesseurDoc = doc(db, "Professeurs", id);
    await updateDoc(ProfesseurDoc, { title: updatedTitle });
  };

  useEffect(() => {
    getProfesseurList();
  }, []);

    const [imageUpload, setImageUpload] = useState(null);

    const [imageUrls, setImageUrls] = useState([]);

    const imagesListRef = ref(storage, "projectFiles/");
  
 const uploadFile = () => {
   if (imageUpload == null) return;
   const imageRef = ref(storage, `projectFiles/${imageUpload.name}`);
   uploadBytes(imageRef, imageUpload).then((snapshot) => {
     getDownloadURL(snapshot.ref).then((url) => {
       
     });
   });
 };

 useEffect(() => {
   listAll(imagesListRef).then((response) => {
     response.items.forEach((item) => {
       getDownloadURL(item).then((url) => {
         setImageUrls((prev) => [...prev, url]);
       });
     });
   });
 }, []);

  
  return (
    <div className="App">
      <Welcome />
      <Auth />
      <div>
        <h2>Ajout d'un Professeur ou d'un étudiant</h2>
        <input
          placeholder="Nom et Prénom..."
          onChange={(e) => setNewProfesseurTitle(e.target.value)}
        />
        <input
          placeholder="Date d'embauche/inscrit..."
          type="number"
          onChange={(e) => setNewInscrit(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewProfesseur}
          onChange={(e) => setisNewProfesseur(e.target.checked)}
        />
        <label> Professeur </label>
        <button onClick={onSubmitProfesseur}> Soumettre</button>
      </div>
      <div>
        {ProfesseurList.map((Professeur) => (
          <div>
            <h1 style={{ color: Professeur.isProf ? "green" : "red" }}>
              {Professeur.title}
            </h1>
            <p> Date: {Professeur.inscription} </p>

            <button onClick={() => deleteProfesseur(Professeur.id)}>
              {" "}
              Retirer{" "}
            </button>

            <input
              placeholder="Noveau Titre..."
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <button onClick={() => updateProfesseurTitle(Professeur.id)}>
              {" "}
              Update Title
            </button>
          </div>
        ))}
      </div>
      <h2>Mise en place des images des professeurs:</h2>
      <div>
        <input
          type="file"
          onChange={(e) => setImageUpload(e.target.files[0])}
        />
        <button onClick={uploadFile}> Envoyer Image! </button>
      </div>
      {imageUrls.map((url) => {
        console.log(url.length)
        return <img src={url} alt="non trouvé" />;
      })}
    </div>
  );
}

export default App;
