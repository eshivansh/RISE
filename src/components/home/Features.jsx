import { features } from "../../data/homeContent.js";

export default function Features() {
  return (
    <section className="services reveal">
      <p className="section-label">Platform Features</p>
      <h2 className="section-heading">Everything you need to <em>grow</em></h2>
      <div className="box-container">
        {features.map((f) => (
          <div className="box" key={f.title}>
            <i className={"bi " + f.icon}></i>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
