import { reviews } from "../../data/homeContent.js";

export default function Reviews() {
  return (
    <section className="reviews reveal" id="reviews">
      <p className="section-label">Testimonials</p>
      <h2 className="section-heading">Loved by <em>traders</em> worldwide</h2>
      <div className="reviews-slider">
        <div className="reviews-track">
          {reviews.map((r, i) => (
            <div className="review-card" key={i}>
              <div className="review-user">
                <img src={"/assets/" + r.img} alt={r.name} />
                <div><h4>{r.name}</h4></div>
              </div>
              <hr className="review-divider" />
              <p className="review-text">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
