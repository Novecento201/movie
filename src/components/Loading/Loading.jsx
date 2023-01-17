import ReactLoading from 'react-loading';
import './loading.css';

function Loading() {
  return (
    <div className="loading-overlay">
      <ReactLoading type="spinningBubbles" color="#293265" />
    </div>
  );
}

export default Loading;
