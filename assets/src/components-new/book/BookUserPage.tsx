import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {useBook} from './BookProvider';

const BookUserPage = () => {
  const {user} = useParams();
  const {
    userProfileBySlug,
    fetchUserProfile,
    eventTypes,
    fetchEventTypes,
  } = useBook();

  useEffect(() => {
    if (!eventTypes) {
      fetchEventTypes(user).then((r) => {});
    }
    if (!userProfileBySlug[user]) {
      fetchUserProfile(user).then((r) => {});
    }
  }, []);

  return (
    <div className="mx-auto p-8">
      <div className="h-56">
        <div className="h-24 gentle-flex text-xl font-normal opacity-75">
          {userProfileBySlug[user]?.full_name}
        </div>
        <div className="text-center">
          欢迎来到我的预约页面。
          <br />
          请按照指导添加预约时间到我的日历。
        </div>
      </div>
      <div className="flex flex-row flex-wrap border-t-2 border-primary border-solid pt-5">
        {['15min', '30min', '45min', '50min'].map((type) => {
          return (
            <Link to={`/@${user}/${type}`}>
              <div
                key={type}
                className="mt-2 ml-2 h-32 w-64 bg-gray-200 cursor-pointer gentle-flex hover:bg-gray-300 rounded"
              >
                {type}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BookUserPage;
