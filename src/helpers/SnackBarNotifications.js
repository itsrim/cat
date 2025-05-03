import { useSnackbar } from 'notistack';

export const Notifications = (message, variant, options = {}) => ({
  message,
  options: {
    key: new Date().getTime() + Math.random(),
    variant,
    ...(options || {})
  }
});

let useSnackbarRef;
export const SnackbarHelperConfigurator = () => {
  useSnackbarRef = useSnackbar();

  return null;
};

export default {
  success(msg, options) {
    this.toast(msg, 'success', options);
  },
  warning(msg, options) {
    this.toast(msg, 'warning', options);
  },
  info(msg, options) {
    this.toast(msg, 'info', options);
  },
  error(msg, options) {
    this.toast(msg, 'error', options);
  },
  toast(msg, variant = 'default', options = {}) {
    useSnackbarRef.enqueueSnackbar(msg, {
      variant,
      ...options
    });
  }
};
