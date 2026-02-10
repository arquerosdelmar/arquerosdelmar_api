const { FirebaseAuthError } = require("firebase-admin/auth");
const { auth, db } = require("../firebase-admin");

exports.signup = async (req, res) => {
  try {
    const {
      email,
      password,
      phoneNumber,
      firstName,
      middleName,
      lastName,
      lastName2,
      role = 'student',
    } = req.body;

    if (isEmptyString(email) && isEmptyString(phoneNumber)) {
      return res.status(400).json({ error: 'email or phoneNumber is required' });
    }
    if (isEmptyString(firstName) || isEmptyString(lastName)) {
      return res
        .status(400)
        .json({ error: 'firstName and lastName are required' });
    }
    if (isEmptyString(password) || password.length < 6) {
      return res
        .status(400)
        .json({ error: 'password is required (min 6 chars)' });
    }

    const createdUser = await auth().createUser({
      email,
      password,
      phoneNumber,
      displayName: `${firstName} ${middleName?.trim()?.charAt(0)?.toUpperCase() + '.' || ''} ${lastName}`,
    });

    console.log(createdUser);

    const registeredUser = await db().collection('users').doc(createdUser.uid).set({
      role,
      fullName: `${firstName} ${middleName || ''} ${lastName} ${lastName2 || ''}`,
      firstName,
      middleName,
      lastName,
      lastName2,
      phoneNumber,
      role,
      updatedAt: new Date(),
      updatedBy: "Admin",
      createdAt: new Date(),
      createdBy: "Admin",
    });

    console.log(registeredUser);

    return res.status(201).json({
      uid: createdUser.uid,
      email: createdUser.email,
      displayName: createdUser.displayName,
      role: role,
    })
  } catch (err) {
    if (err instanceof FirebaseAuthError) {
      console.error('Firebase Auth error:', err);
      return res.status(409).json({ error: "Firebase Auth Error", detail: err.message });
    }
    console.error('Create user error:', err);
    return res.status(500).json({ error: 'Internal error', details: err.message });
  }
}

function isEmptyString(v) {
  return typeof v === 'string' && v.trim().length <= 0
}
