var id="8J34fCM8jUPmdCAAHXqT";
db.collection("todo-items").doc(id).delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});