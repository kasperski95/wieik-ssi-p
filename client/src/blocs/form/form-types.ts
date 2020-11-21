export interface FormBlocOptions<T> {
  onSubmit?: (formData: T) => void;
  submitOnChange?: boolean;
}
