
/*
Script to backup "applications" collection in Firestore, to json
*/


// FILE PATHS
file_path = "./backup/applications2025.json" //.json file to save data to
firebase_service_key_path = "./firebaseservicekey.json"


// Import necessary modules
const admin = require('firebase-admin');
const fs = require('fs');

// Path to your service account key file
const serviceAccount = require(firebase_service_key_path);

// Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const collectionName = 'applications'; // <-- Replace with your collection name

async function exportCollection() {
  try {
    const collectionRef = db.collection(collectionName);
    const snapshot = await collectionRef.get();

    const data = {};
    snapshot.forEach(doc => {
      data[doc.id] = doc.data();
    });

    // Write the data to a local JSON file
    fs.writeFileSync(file_path, JSON.stringify(data, null, 2));
    console.log(`Successfully exported collection '${collectionName}' to ${file_path}! 🎉`);

  } catch (error) {
    console.error('Error exporting collection:', error);
  }
}

exportCollection();