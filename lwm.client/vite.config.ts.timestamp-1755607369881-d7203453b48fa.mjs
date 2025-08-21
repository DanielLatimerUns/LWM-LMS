// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///Users/danielunsworth/Dev/LWM-LMS/lwm.client/node_modules/vite/dist/node/index.js";
import plugin from "file:///Users/danielunsworth/Dev/LWM-LMS/lwm.client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import fs from "fs";
import path from "path";
import child_process from "child_process";
var __vite_injected_original_import_meta_url = "file:///Users/danielunsworth/Dev/LWM-LMS/lwm.client/vite.config.ts";
var baseFolder = process.env.APPDATA !== void 0 && process.env.APPDATA !== "" ? `${process.env.APPDATA}/ASP.NET/https` : `${process.env.HOME}/.aspnet/https`;
var certificateArg = process.argv.map((arg) => arg.match(/--name=(?<value>.+)/i)).filter(Boolean)[0];
var certificateName = certificateArg ? certificateArg.groups.value : "lwm.client";
if (!certificateName) {
  console.error("Invalid certificate name. Run this script in the context of an npm/yarn script or pass --name=<<app>> explicitly.");
  process.exit(-1);
}
var certFilePath = path.join(baseFolder, `${certificateName}.pem`);
var keyFilePath = path.join(baseFolder, `${certificateName}.key`);
if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  const result = child_process.spawnSync("npm", [
    "dev-certs",
    "https",
    "--export-path",
    certFilePath,
    "--format",
    "Pem",
    "--no-password"
  ], { shell: true, encoding: "utf-8" });
  console.log(result);
}
var vite_config_default = defineConfig({
  plugins: [plugin()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "https://localhost:7120/",
        secure: false,
        rewrite: (path2) => path2.replace(/^\/api/, ""),
        changeOrigin: true
      }
    },
    port: 5173,
    https: {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath)
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZGFuaWVsdW5zd29ydGgvRGV2L0xXTS1MTVMvbHdtLmNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2RhbmllbHVuc3dvcnRoL0Rldi9MV00tTE1TL2x3bS5jbGllbnQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2RhbmllbHVuc3dvcnRoL0Rldi9MV00tTE1TL2x3bS5jbGllbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCc7XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHBsdWdpbiBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgY2hpbGRfcHJvY2VzcyBmcm9tICdjaGlsZF9wcm9jZXNzJztcblxuY29uc3QgYmFzZUZvbGRlciA9XG4gICAgcHJvY2Vzcy5lbnYuQVBQREFUQSAhPT0gdW5kZWZpbmVkICYmIHByb2Nlc3MuZW52LkFQUERBVEEgIT09ICcnXG4gICAgICAgID8gYCR7cHJvY2Vzcy5lbnYuQVBQREFUQX0vQVNQLk5FVC9odHRwc2BcbiAgICAgICAgOiBgJHtwcm9jZXNzLmVudi5IT01FfS8uYXNwbmV0L2h0dHBzYDtcblxuY29uc3QgY2VydGlmaWNhdGVBcmcgPSBwcm9jZXNzLmFyZ3YubWFwKGFyZyA9PiBhcmcubWF0Y2goLy0tbmFtZT0oPzx2YWx1ZT4uKykvaSkpLmZpbHRlcihCb29sZWFuKVswXTtcbmNvbnN0IGNlcnRpZmljYXRlTmFtZSA9IGNlcnRpZmljYXRlQXJnID8gY2VydGlmaWNhdGVBcmcuZ3JvdXBzLnZhbHVlIDogXCJsd20uY2xpZW50XCI7XG5cbmlmICghY2VydGlmaWNhdGVOYW1lKSB7XG4gICAgY29uc29sZS5lcnJvcignSW52YWxpZCBjZXJ0aWZpY2F0ZSBuYW1lLiBSdW4gdGhpcyBzY3JpcHQgaW4gdGhlIGNvbnRleHQgb2YgYW4gbnBtL3lhcm4gc2NyaXB0IG9yIHBhc3MgLS1uYW1lPTw8YXBwPj4gZXhwbGljaXRseS4nKVxuICAgIHByb2Nlc3MuZXhpdCgtMSk7XG59XG5cbmNvbnN0IGNlcnRGaWxlUGF0aCA9IHBhdGguam9pbihiYXNlRm9sZGVyLCBgJHtjZXJ0aWZpY2F0ZU5hbWV9LnBlbWApO1xuY29uc3Qga2V5RmlsZVBhdGggPSBwYXRoLmpvaW4oYmFzZUZvbGRlciwgYCR7Y2VydGlmaWNhdGVOYW1lfS5rZXlgKTtcblxuaWYgKCFmcy5leGlzdHNTeW5jKGNlcnRGaWxlUGF0aCkgfHwgIWZzLmV4aXN0c1N5bmMoa2V5RmlsZVBhdGgpKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gY2hpbGRfcHJvY2Vzcy5zcGF3blN5bmMoJ25wbScsIFtcbiAgICAgICAgJ2Rldi1jZXJ0cycsXG4gICAgICAgICdodHRwcycsXG4gICAgICAgICctLWV4cG9ydC1wYXRoJyxcbiAgICAgICAgY2VydEZpbGVQYXRoLFxuICAgICAgICAnLS1mb3JtYXQnLFxuICAgICAgICAnUGVtJyxcbiAgICAgICAgJy0tbm8tcGFzc3dvcmQnLFxuICAgIF0sIHtzaGVsbDp0cnVlLCBlbmNvZGluZzondXRmLTgnfSk7XG4gICAgY29uc29sZS5sb2cocmVzdWx0KTtcbn1cblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW3BsdWdpbigpXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgICAgICB9XG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgICAgcHJveHk6IHtcbiAgICAgICAgICAgICcvYXBpJzoge1xuICAgICAgICAgICAgICAgIHRhcmdldDogJ2h0dHBzOi8vbG9jYWxob3N0OjcxMjAvJyxcbiAgICAgICAgICAgICAgICBzZWN1cmU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHJld3JpdGU6IHBhdGggPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLFxuICAgICAgICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBwb3J0OiA1MTczLFxuICAgICAgICBodHRwczoge1xuICAgICAgICAgICAga2V5OiBmcy5yZWFkRmlsZVN5bmMoa2V5RmlsZVBhdGgpLFxuICAgICAgICAgICAgY2VydDogZnMucmVhZEZpbGVTeW5jKGNlcnRGaWxlUGF0aCksXG4gICAgICAgIH1cbiAgICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzVCxTQUFTLGVBQWUsV0FBVztBQUV6VixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFlBQVk7QUFDbkIsT0FBTyxRQUFRO0FBQ2YsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sbUJBQW1CO0FBTnNLLElBQU0sMkNBQTJDO0FBUWpQLElBQU0sYUFDRixRQUFRLElBQUksWUFBWSxVQUFhLFFBQVEsSUFBSSxZQUFZLEtBQ3ZELEdBQUcsUUFBUSxJQUFJLE9BQU8sbUJBQ3RCLEdBQUcsUUFBUSxJQUFJLElBQUk7QUFFN0IsSUFBTSxpQkFBaUIsUUFBUSxLQUFLLElBQUksU0FBTyxJQUFJLE1BQU0sc0JBQXNCLENBQUMsRUFBRSxPQUFPLE9BQU8sRUFBRSxDQUFDO0FBQ25HLElBQU0sa0JBQWtCLGlCQUFpQixlQUFlLE9BQU8sUUFBUTtBQUV2RSxJQUFJLENBQUMsaUJBQWlCO0FBQ2xCLFVBQVEsTUFBTSxtSEFBbUg7QUFDakksVUFBUSxLQUFLLEVBQUU7QUFDbkI7QUFFQSxJQUFNLGVBQWUsS0FBSyxLQUFLLFlBQVksR0FBRyxlQUFlLE1BQU07QUFDbkUsSUFBTSxjQUFjLEtBQUssS0FBSyxZQUFZLEdBQUcsZUFBZSxNQUFNO0FBRWxFLElBQUksQ0FBQyxHQUFHLFdBQVcsWUFBWSxLQUFLLENBQUMsR0FBRyxXQUFXLFdBQVcsR0FBRztBQUM3RCxRQUFNLFNBQVMsY0FBYyxVQUFVLE9BQU87QUFBQSxJQUMxQztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0osR0FBRyxFQUFDLE9BQU0sTUFBTSxVQUFTLFFBQU8sQ0FBQztBQUNqQyxVQUFRLElBQUksTUFBTTtBQUN0QjtBQUdBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLFNBQVMsQ0FBQyxPQUFPLENBQUM7QUFBQSxFQUNsQixTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3hEO0FBQUEsRUFDSjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ0osT0FBTztBQUFBLE1BQ0gsUUFBUTtBQUFBLFFBQ0osUUFBUTtBQUFBLFFBQ1IsUUFBUTtBQUFBLFFBQ1IsU0FBUyxDQUFBQSxVQUFRQSxNQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsUUFDMUMsY0FBYztBQUFBLE1BQ2xCO0FBQUEsSUFDSjtBQUFBLElBQ0EsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0gsS0FBSyxHQUFHLGFBQWEsV0FBVztBQUFBLE1BQ2hDLE1BQU0sR0FBRyxhQUFhLFlBQVk7QUFBQSxJQUN0QztBQUFBLEVBQ0o7QUFDSixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
