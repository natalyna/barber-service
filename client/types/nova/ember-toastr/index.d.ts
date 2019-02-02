import Service from '@ember/service';

export default class Toast extends Service {
	error(message: string, title?: string, options?: any): void;
	info(message: string, title?: string, options?: any): void;
	success(message: string, title?: string, options?: any): void;
	warning(message: string, title?: string, options?: any): void;
}

declare module '@ember/service' {
	interface Registry {
		toast: Toast;
	}
}