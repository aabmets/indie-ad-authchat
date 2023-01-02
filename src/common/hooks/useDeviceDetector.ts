import { useMediaQuery } from "react-responsive";
import appConfig from "app.config";

export interface DeviceDetector {
	isMobile: boolean;
	isSuperNarrow: boolean;
}

export function useDeviceDetector(): DeviceDetector {
	const { mobileScreenMaxWidth, superNarrowMaxWidth} = appConfig.style;
	const query1 = `(max-width: ${mobileScreenMaxWidth}px)`;
	const query2 = `(max-width: ${superNarrowMaxWidth}px)`;
	const isMobile = useMediaQuery({ query: query1 });
	const isSuperNarrow = useMediaQuery({ query:query2 });
	return { isMobile, isSuperNarrow };
}