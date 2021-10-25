
const list=document.querySelector("ul");
const form= document.querySelector("#addNotes");

const addNote = (note, id) => {
  let time = note.created_at.toDate();
  
  let html=`
  <li data-id="${id}"> 
      <div>Title :${note.title}</div>
      <div>Body :${note.body}</div>
      
      <div>${time.getDate()}-${time.getMonth()}-${time.getFullYear()}</div>
      <button class="btn btn-danger btn-sm my-2">delete</button>

  </li>
  `;

  list.innerHTML += html;
}
const deleteNote = (id) =>{
    const notes = document.querySelectorAll("li");
    notes.forEach(note => {
        if(note.getAttribute("data-id") === id){
            note.remove();
        }
    });

}

 
    //add documents
    form.addEventListener("submit", e => {
        e.preventDefault();
        
        const now = new Date();
         const note = {
             title: form.title.value,
             body: form.body.value,
             created_at: firebase.firestore.Timestamp.fromDate(now)

         };
         db.collection("notes").add(note).then(() => { 
             console.log("note added");
         }).catch(err => {
             console.log(err);
         });


    });
    // get documents
    db.collection("notes").get().then(snapshot =>{
        snapshot.docs.forEach(doc =>{
            addNote(doc.data(), doc.id);
        });
    }).catch(err => {
      console.log(err);
    });

    //deleting data
    list.addEventListener("click" , e => {
        //console.log(e);
        if(e.target.tagName === "BUTTON"){
            const id = e.target.parentElement.getAttribute("data-id");
            db.collection("notes").doc(id).delete().then(() => {
                console.log("note delete");
            });
        }
    });
    

