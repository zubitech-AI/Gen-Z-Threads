import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import API from '../utils/axiosInstance';
import TryOnCanvas from '../components/TryOnCanvas';

export default function TryOn() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [overlayUrl, setOverlayUrl] = useState('');

  useEffect(() => {
    API.get(`/products/${id}`).then(res => setProduct(res.data)).catch(() => {});
    API.get(`/products/${id}/overlay`).then(res => setOverlayUrl(res.data.overlay_image_url)).catch(() => {});
  }, [id]);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '84px 24px 60px' }}>
      <Link to={`/products/${id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', textDecoration: 'none', marginBottom: 24 }}>
        <FiArrowLeft /> Back to Product
      </Link>
      {product && <h1 style={{ color: 'var(--text-color)', marginBottom: 8 }}>Try On: {product.name}</h1>}
      <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>See how this looks on you using your camera!</p>
      <TryOnCanvas productId={id} overlayUrl={overlayUrl} />
    </div>
  );
}
