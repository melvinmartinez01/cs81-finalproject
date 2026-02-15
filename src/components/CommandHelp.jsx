export default function CommandHelp() {
    return (
        <div className="pad">
          <h2>Command Guide</h2>
          <p className="muted">Try these example commands:</p>

          <ul className="cmdList">
            <li><code>turn on bathroom lights</code></li>
            <li><code>turn off living room lights</code></li>
            <li><code>unlock doggy door</code></li>
            <li><code>dispense ice water</code></li>
            <li><code>bathroom: toilet paper</code></li>
            <li><code>play music in master bedroom</code></li>
            <li><code>call mom</code></li>
            <li><code>call samantha</code></li>
            <li><code>call the burger palace</code></li>
          </ul>
        </div>
    );
}