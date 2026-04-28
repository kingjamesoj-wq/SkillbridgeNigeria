import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User as AppUser } from '@/src/constants';
import { auth, db, signInWithGoogle, serverTimestamp } from '@/src/lib/firebase';
import { onAuthStateChanged, signOut, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot, collection, getDocFromServer } from 'firebase/firestore';
import { handleFirestoreError, OperationType } from '@/src/lib/firebaseUtils';

interface AuthContextType {
  user: AppUser | null;
  login: (email: string, role: 'graduate' | 'employer') => Promise<void>;
  googleLogin: (role: 'graduate' | 'employer') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  purchasedCourses: string[];
  enrollInCourse: (courseId: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Connection test
  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if(error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    }
    testConnection();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        await syncUser(fbUser);
      } else {
        setUser(null);
        setPurchasedCourses([]);
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  async function syncUser(fbUser: FirebaseUser, requestedRole?: 'graduate' | 'employer') {
    const userRef = doc(db, 'users', fbUser.uid);
    try {
      const userSnap = await getDoc(userRef);
      
      let appUser: AppUser;
      if (!userSnap.exists()) {
        // Create new user record
        const newUser: any = {
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
          email: fbUser.email || '',
          role: requestedRole || 'graduate',
          xp: 0,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };
        await setDoc(userRef, newUser);
        appUser = { ...newUser, id: fbUser.uid };
      } else {
        const data = userSnap.data();
        appUser = {
          id: fbUser.uid,
          name: data.name,
          email: data.email,
          role: data.role,
          avatar: fbUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${fbUser.email}`
        };
      }
      setUser(appUser);

      // Listen for enrollments
      const enrollmentsRef = collection(db, 'users', fbUser.uid, 'enrollments');
      const unsubEnrollments = onSnapshot(enrollmentsRef, (snapshot) => {
        const ids = snapshot.docs.map(d => d.data().courseId);
        setPurchasedCourses(ids);
      }, (err) => handleFirestoreError(err, OperationType.GET, `users/${fbUser.uid}/enrollments`));

      setLoading(false);
      return () => unsubEnrollments();
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `users/${fbUser.uid}`);
    }
  }

  const login = async (email: string, role: 'graduate' | 'employer') => {
    // For this app, we'll stick to a simple role selection + simulated auth or Google
    // Since Firebase Auth is set up, let's use it properly.
    // However, the user request didn't ask for email/password signup flow complexity yet.
    // I'll implement Google login as the primary real way.
    console.warn("Standard login not fully implemented with Firebase Email/Password yet. Use googleLogin.");
  };

  const googleLogin = async (role: 'graduate' | 'employer') => {
    const fbUser = await signInWithGoogle();
    if (fbUser) {
      await syncUser(fbUser, role);
    }
  };

  const logout = () => {
    signOut(auth);
  };

  const enrollInCourse = async (courseId: string) => {
    if (!user) return;
    const enrollmentsRef = collection(db, 'users', user.id, 'enrollments');
    const enrollmentId = courseId; // or random
    try {
      await setDoc(doc(enrollmentsRef, enrollmentId), {
        courseId,
        enrolledAt: serverTimestamp(),
        progress: 0
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.id}/enrollments/${enrollmentId}`);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, googleLogin, logout, isAuthenticated: !!user, purchasedCourses, enrollInCourse, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
