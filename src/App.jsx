import { ThemeProvider } from './contexts/theme'
import { AuthGoogleProvider } from './contexts/authGoogle'
import AppRoutes from './routes/Routes'

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <AuthGoogleProvider>
        <AppRoutes />
      </AuthGoogleProvider>
    </ThemeProvider>
  )
}
