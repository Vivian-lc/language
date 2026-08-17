import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { ProgressProvider } from '@/context/ProgressContext'
import { Layout } from '@/components/Layout'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Dashboard from '@/pages/Dashboard'
import Courses from '@/pages/Courses'
import CourseDetail from '@/pages/CourseDetail'
import LessonView from '@/pages/LessonView'
import Vocabulary from '@/pages/Vocabulary'
import Grammar from '@/pages/Grammar'
import Listening from '@/pages/Listening'
import Speaking from '@/pages/Speaking'
import Recommendations from '@/pages/Recommendations'
import Community from '@/pages/Community'
import Achievements from '@/pages/Achievements'
import Progress from '@/pages/Progress'

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/courses" element={<Courses />} />
                      <Route path="/courses/:courseId" element={<CourseDetail />} />
                      <Route path="/lessons/:lessonId" element={<LessonView />} />
                      <Route path="/vocabulary" element={<Vocabulary />} />
                      <Route path="/grammar" element={<Grammar />} />
                      <Route path="/listening" element={<Listening />} />
                      <Route path="/speaking" element={<Speaking />} />
                      <Route path="/recommendations" element={<Recommendations />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/achievements" element={<Achievements />} />
                      <Route path="/progress" element={<Progress />} />
                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ProgressProvider>
    </AuthProvider>
  )
}
