import {openPopover} from './popovers';
import Popover from './Popover';

function openUserPopover(target, user) {
  return openPopover(
    ({close}) => (
      <Popover style={{minWidth: 340}}>
        Name: <strong>{user.fullname}</strong>
        <br />
        Age: <strong>{user.age}</strong>
        <br />
        <br />
        <button className="secondary" onClick={close}>
          Dismiss
        </button>
      </Popover>
    ),
    target,
    {placement: 'left'}
  );
}

const data = [
  {fullname: 'Jan Nowak', age: 39},
  {fullname: 'Teresa Stefaniak', age: 53},
  {fullname: 'Tomasz Nocuń', age: 41},
  {fullname: 'Agnieszka Mak', age: 27},
];

const PopoverDemo = () => (
  <main>
    <div className="alert">
      <dl>
        <dt>React meets Popper.js</dt>
        <dd>Click on the buttons below to open popovers.</dd>
      </dl>
    </div>

    <section>
      <article>
        <div className="card has-sections">
          {data.map((user, index) => [
            index > 0 && <hr key={`separator${index}`} />,
            <div className="card-section" key={index}>
              <div className="card-text">{user.fullname}</div>
              <div className="card-actions">
                <button onClick={(e) => openUserPopover(e.currentTarget, user)}>
                  More info
                </button>
              </div>
            </div>,
          ])}
        </div>
      </article>
    </section>
    <footer>
      <article className="help">
        <span></span>
        <p>
          Learn more about <a href="https://popper.js.org">Popper.js</a> and{' '}
          <a href="https://www.uptowncss.com/">Uptown CSS</a>.
        </p>
      </article>
    </footer>
  </main>
);

export default PopoverDemo;
