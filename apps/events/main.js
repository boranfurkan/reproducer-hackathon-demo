import { html, render, useEffect, useState } from "/vendor/htm-preact@3.1.1/standalone.module.js";
import { byStartTime, timeLabel } from "/lib/timeutil.js";

function EventPage() {
  const [date, setDate] = useState(new URLSearchParams(location.search).get("date") ?? "2026-10-25");
  const [event, setEvent] = useState(null);
  const [picked, setPicked] = useState(null);
  const [name, setName] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    setEvent(null);
    setPicked(null);
    fetch(`/api/events/${date}`).then((r) => (r.ok ? r.json() : null)).then(setEvent);
  }, [date]);

  async function book() {
    const res = await fetch(`/api/events/${date}/bookings`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ startsAt: picked.startsAt, name }),
    });
    const body = await res.json();
    setResult(res.ok ? `Booked for ${timeLabel(new Date(body.startsAt))}. See you there, ${body.name}.` : body.error);
  }

  const sessions = event ? byStartTime(event.sessions) : [];

  return html`
    <main>
      <label for="date">Date</label>
      <input id="date" type="date" value=${date} onInput=${(e) => setDate(e.target.value)} data-testid="date" />
      ${event
        ? html`
            <h2>${event.title}</h2>
            <p class="muted">${event.venue} · ${event.sessions.length} one-hour sessions through the night</p>
            <ul class="sessions" data-testid="sessions">
              ${sessions.map(
                (s) => html`
                  <li>
                    <button aria-pressed=${picked === s} onClick=${() => setPicked(s)} data-testid="session">${timeLabel(new Date(s.startsAt))}</button>
                  </li>
                `,
              )}
            </ul>
            <label for="name">Your name</label>
            <input id="name" value=${name} onInput=${(e) => setName(e.target.value)} data-testid="name" />
            <p>
              <button class="primary" disabled=${!picked || !name} onClick=${book} data-testid="book">Book this session</button>
            </p>
            <p data-testid="result" class="ok">${result}</p>
          `
        : html`<p class="muted">No event on that date.</p>`}
    </main>
  `;
}

render(html`<${EventPage} />`, document.getElementById("app"));
