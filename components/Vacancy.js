import React from 'react';
import Link from 'next/link';

const Vacancy = ({ vacancy }) => {
  return (
    <div className="pl-0 pl-md-5">
      <Link href={`/vacancies/${vacancy?.attributes.Slug}`}>
        <a className="text-dark d-block">
          <h4>{vacancy?.attributes.Title}</h4>
          <span>{vacancy?.attributes.employer?.data?.attributes.Name}</span>
        </a>
      </Link>
    </div>
  );
}

export default Vacancy;