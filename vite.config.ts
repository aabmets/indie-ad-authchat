import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigPaths()],
	build: {
		outDir: 'pocketbase/pb_public'
	},
	server: {
		port: 4040,
		host: 'localhost',
		hmr: {
			host: 'localhost',
			clientPort: 80
		}
	}
})
