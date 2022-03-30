import './style.css';
import { createMemoryHistory, createPath, parsePath } from 'history';

let history = createMemoryHistory({
  initialEntries: ['/home', '/profile', '/about'],
});

let unlisten = history.listen(({ location, action }) => {
  console.log('listen: ', action, location.pathname, location.state);
});

history.push('/home', { data: 'Test' });
history.replace('/profile');
history.back();
history.forward();
history.go(2);

let unblock = history.block(({ action, location, retry }) => {
  console.log('block: ', action, location, retry);

  let url = location.pathname;
  if (
    url === '/profile' &&
    window.confirm(`Are you sure you want to go to ${url}?`)
  ) {
    unblock();

    retry();
  }
});

history.push('/profile?section=password', { data: 'test' });

console.log(history, history.location);

history.push(
  {
    pathname: '/profile',
    search: '?section=password',
  },
  {
    data: 'test',
  }
);

console.log(history.createHref('/profile'));

// /profile?section=password
let newPath = createPath({ pathname: '/profile', search: '?section=password' });
// {search: '?section?password', pathname: '/profile'}
let parsedPath = parsePath('/profile?section?password');

console.log(newPath, parsedPath);
