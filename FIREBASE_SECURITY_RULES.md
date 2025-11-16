# Firebase Setup Guide

This guide will help you set up Firebase Authentication and Security Rules for the Vocabulary Builder app.

## Step 1: Enable Email/Password Authentication

**Important**: You must enable Email/Password authentication before users can create accounts.

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on **"Authentication"** in the left sidebar (under "Build")
4. If this is your first time, click **"Get started"**
5. Go to the **"Sign-in method"** tab at the top
6. Under **"Native providers"**, find **"Email/Password"**
7. Click on it to expand the settings
8. Toggle the **"Enable"** switch to ON
9. Click **"Save"**

**That's it!** Users can now create accounts and log in with email and password.

## Step 2: Configure Security Rules

To ensure each user can only access their own vocabulary data, you need to configure Firebase Security Rules. These rules run on the Firebase server and prevent unauthorized access to user data.

### How to Apply These Rules

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on "Firestore Database" in the left sidebar
4. Click on the "Rules" tab
5. Replace the existing rules with the rules below
6. Click "Publish" to apply the changes

## Security Rules for Firestore

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function to check if user owns the data
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    // Rules for vocabulary app data
    match /artifacts/{appId}/users/{userId}/{document=**} {
      // Allow users to read and write only their own data
      allow read, write: if isAuthenticated() && isOwner(userId);
    }
    
    // Deny all other access by default
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

## What These Rules Do

1. **Authentication Check**: Users must be signed in (either anonymously or with an account)
2. **User Isolation**: Each user can only access data under their own user ID path
3. **Path Structure**: Data is stored at `/artifacts/{appId}/users/{userId}/...`
   - `{appId}` is your Firebase project ID
   - `{userId}` is the unique user ID from Firebase Authentication
   - Users can create collections like `words` and `metadata` under their path

## How User Data is Isolated

When a user signs in to your app:
1. Firebase assigns them a unique User ID (UID)
2. All their vocabulary words are stored at: `/artifacts/{appId}/users/{their-uid}/words/{wordId}`
3. Their streak and stats are stored at: `/artifacts/{appId}/users/{their-uid}/metadata/profile`
4. The security rules ensure they can ONLY access paths containing their own UID
5. They cannot read or modify any other user's data

## Testing the Rules

After publishing the rules, you can test them in the Firebase Console:
1. Go to the "Rules" tab
2. Click "Rules Playground"
3. Try different read/write operations to verify they work as expected

## Important Notes

- **Email/Password Authentication**: Users create accounts with email and password. Their data syncs across all devices when they log in with the same account.
- **Secure Passwords**: Firebase automatically enforces a minimum password length of 6 characters. Users should choose strong, unique passwords.
- **Account Recovery**: Firebase provides built-in password reset functionality via email (can be configured in Authentication settings).
- **Data Isolation**: Each user's vocabulary data is completely isolated - users can only access their own words and statistics.
- **Cross-Device Sync**: When users log in on a new device, all their vocabulary words automatically sync from Firestore.
- **Data Migration**: If you have existing test data in your database, make sure it follows the correct path structure: `/artifacts/{appId}/users/{userId}/...`

## Troubleshooting

**Error: "Firebase: Error (auth/operation-not-allowed)"**
- This means Email/Password authentication is not enabled in Firebase
- Follow Step 1 above to enable it in the Firebase Console

**Users can't log in after creating an account**
- Check that Security Rules are properly configured (Step 2)
- Verify the rules are published in Firebase Console
- Check browser console for specific error messages
