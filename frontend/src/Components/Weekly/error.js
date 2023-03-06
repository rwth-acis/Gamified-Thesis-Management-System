import 'bootstrap/dist/css/bootstrap.css';

const ErrorMessage = (e) => {
    return(
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
              <strong class="mr-auto">Error:</strong>
            </div>
            <div class="toast-body">
              {e}
            </div>
        </div>
    )
}
export default ErrorMessage