import admin from './firebase-service';

export const makeUserAdmin = async (req, res) => {
  const userId = "1NLxf9B6lhQo1vkwf2A4N4k5DxL2"; // userId is the firebase uid for the user
  await admin.auth().setCustomUserClaims(userId, {admin: true});

  return res.send({message: 'Success'})
}
