"use server";
import { LinkIcon } from "lucide-react";
import Link from "next/link";
import {
  searchProfessorsAtSchoolId,
  searchSchool,
  getProfessorRatingAtSchoolId,
} from "ratemyprofessor-api";
import {
  IoInformation,
  IoInformationCircle,
  IoRepeat,
  IoShield,
  IoStar,
} from "react-icons/io5";
import InformationButton from "./InformationButton";

const RateMyProfessors = async ({ classInfo }: { classInfo: any }) => {
  const school = await searchSchool(classInfo.college);

  if (!school) {
    return <div>School not found</div>;
  }

  if (!classInfo.recommended_professors) {
    return null;
  }

  let teachers: any[] = [];

  await Promise.all(
    classInfo.recommended_professors?.map(async (teacher: any) => {
      let t = await getProfessorRatingAtSchoolId(teacher, school[0].node.id);
      teachers.push(t);
    }),
  );

  if (!teachers) {
    return null;
  }

  return (
    <div className="relative mb-32 bg-zinc-50 p-4">
      <svg
        width="289"
        height="39"
        viewBox="0 0 289 39"
        fill="none"
        className="mb-5 drop-shadow-lg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0 0V31.1277H24.0995H25.7765L24.292 39L40.2185 31.1277H112.021L123 0H0Z"
          fill="#151515"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M121.969 0L111 31.1422H248.848L264.731 39L263.251 31.1422H289V0H121.969Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.2794 12.4461H15.7831V15.0778H17.1152C18.0194 15.0778 19.1547 14.8544 19.1547 13.7057C19.1547 12.6529 18.1182 12.4461 17.2794 12.4461ZM19.269 21.5373L16.7534 17.0559H15.7994V21.5373H13.0363V10.2446H17.477C19.7134 10.2446 21.9333 11.0741 21.9333 13.6582C21.9333 15.1736 21.012 16.2581 19.5157 16.7049L22.5582 21.5373H19.269Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M33.6443 13.2592L32.1643 17.1353H35.0908L33.6443 13.2592ZM36.7684 21.5375L35.8642 19.3202H31.3581L30.503 21.5375H27.4442L32.3284 10.2449H35.0581L39.8934 21.5375H36.7684Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M49.7951 12.5734V21.537H46.9829V12.5734H43.6938V10.2451H53.0834V12.5734H49.7951Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M59.3016 21.5373V10.2446H67.1287V12.5578H62.0149V14.6793H66.8493V16.8642H62.0149V19.209H67.426V21.5373H59.3016Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M91.0882 21.5373L91.1536 13.5465H91.1045L88.0784 21.5373H86.1051L83.1615 13.5465H83.1124L83.1778 21.5373H80.5306V10.2446H84.5271L87.1742 17.486H87.2404L89.7724 10.2446H93.835V21.5373H91.0882Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M106.829 16.7525V21.5373H104.016V16.7525L99.6418 10.2446H103.045L105.53 14.4242L108.012 10.2446H111.301L106.829 16.7525Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M128.451 12.4461H127.218V15.1095H128.402C129.454 15.1095 130.425 14.8068 130.425 13.7382C130.425 12.6537 129.454 12.4461 128.451 12.4461ZM128.616 17.2793H127.218V21.5373H124.406V10.2446H128.681C131.23 10.2446 133.236 11.1382 133.236 13.7223C133.236 16.3381 131.05 17.2793 128.616 17.2793Z"
          fill="#151515"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M144.11 12.4461H142.614V15.0778H143.945C144.85 15.0778 145.985 14.8544 145.985 13.7065C145.985 12.6537 144.949 12.4461 144.11 12.4461ZM146.101 21.5373L143.583 17.0551H142.63V21.5373H139.868V10.2446H144.307C146.543 10.2446 148.764 11.0749 148.764 13.6582C148.764 15.1736 147.843 16.2581 146.346 16.7041L149.389 21.5373H146.101Z"
          fill="#151515"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M161.496 12.3985C159.523 12.3985 158.175 13.8657 158.175 15.8437C158.175 17.8852 159.539 19.3523 161.496 19.3523C163.453 19.3523 164.835 17.8852 164.835 15.8437C164.835 13.8657 163.469 12.3985 161.496 12.3985ZM161.496 21.8406C157.862 21.8406 155.164 19.4157 155.164 15.8437C155.164 12.2234 157.862 9.94195 161.496 9.94195C165.147 9.94195 167.843 12.2234 167.843 15.8437C167.843 19.4157 165.147 21.8406 161.496 21.8406Z"
          fill="#151515"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M177.419 12.5741V14.9024H181.925V17.1506H177.419V21.537H174.64V10.2451H182.303V12.5741H177.419Z"
          fill="#151515"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M189.048 21.5373V10.2446H196.876V12.5578H191.762V14.6785H196.596V16.8642H191.762V19.209H197.171V21.5373H189.048Z"
          fill="#151515"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M210.117 13.1799C209.641 12.5897 208.77 12.2063 208.046 12.2063C207.321 12.2063 206.418 12.4463 206.418 13.3399C206.418 14.0885 207.108 14.3277 208.211 14.6628C209.789 15.1579 211.828 15.8115 211.828 18.0605C211.828 20.6605 209.673 21.8242 207.371 21.8242C205.71 21.8242 204.033 21.234 203.013 20.1978L204.855 18.379C205.415 19.065 206.45 19.576 207.371 19.576C208.227 19.576 208.982 19.2567 208.982 18.3481C208.982 17.4862 208.094 17.2153 206.565 16.7368C205.086 16.2741 203.588 15.5398 203.588 13.4983C203.588 10.995 205.924 9.95803 208.094 9.95803C209.41 9.95803 210.89 10.4365 211.91 11.3459L210.117 13.1799Z"
          fill="#151515"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M224.772 13.1799C224.296 12.5897 223.425 12.2063 222.701 12.2063C221.976 12.2063 221.073 12.4463 221.073 13.3399C221.073 14.0885 221.764 14.3277 222.865 14.6628C224.445 15.1579 226.483 15.8115 226.483 18.0605C226.483 20.6605 224.328 21.8242 222.027 21.8242C220.364 21.8242 218.688 21.234 217.669 20.1978L219.51 18.379C220.07 19.065 221.106 19.576 222.027 19.576C222.882 19.576 223.637 19.2567 223.637 18.3481C223.637 17.4862 222.749 17.2153 221.22 16.7368C219.741 16.2741 218.245 15.5398 218.245 13.4983C218.245 10.995 220.579 9.95803 222.749 9.95803C224.066 9.95803 225.545 10.4365 226.565 11.3459L224.772 13.1799Z"
          fill="#151515"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M239.065 12.3985C237.093 12.3985 235.744 13.8657 235.744 15.8437C235.744 17.8852 237.109 19.3523 239.065 19.3523C241.022 19.3523 242.404 17.8852 242.404 15.8437C242.404 13.8657 241.04 12.3985 239.065 12.3985ZM239.065 21.8406C235.431 21.8406 232.735 19.4157 232.735 15.8437C232.735 12.2234 235.431 9.94195 239.065 9.94195C242.717 9.94195 245.414 12.2234 245.414 15.8437C245.414 19.4157 242.717 21.8406 239.065 21.8406Z"
          fill="#151515"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M256.454 12.4461H254.956V15.0778H256.289C257.193 15.0778 258.328 14.8544 258.328 13.7065C258.328 12.6537 257.292 12.4461 256.454 12.4461ZM258.443 21.5373L255.927 17.0551H254.973V21.5373H252.21V10.2446H256.651C258.887 10.2446 261.107 11.0749 261.107 13.6582C261.107 15.1736 260.185 16.2581 258.689 16.7041L261.732 21.5373H258.443Z"
          fill="#151515"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M274.2 13.1799C273.723 12.5897 272.853 12.2063 272.129 12.2063C271.404 12.2063 270.501 12.4463 270.501 13.3399C270.501 14.0885 271.191 14.3277 272.294 14.6628C273.872 15.1579 275.911 15.8115 275.911 18.0605C275.911 20.6605 273.756 21.8242 271.454 21.8242C269.793 21.8242 268.117 21.234 267.096 20.1978L268.937 18.379C269.498 19.065 270.533 19.576 271.454 19.576C272.309 19.576 273.065 19.2567 273.065 18.3481C273.065 17.4862 272.177 17.2153 270.648 16.7368C269.169 16.2741 267.672 15.5398 267.672 13.4983C267.672 10.995 270.007 9.95803 272.177 9.95803C273.493 9.95803 274.973 10.4365 275.993 11.3459L274.2 13.1799Z"
          fill="#151515"
        />
      </svg>
      <InformationButton />

      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teachers.map((teacher, index) => (
          <li
            key={index}
            className="group w-full rounded-md bg-white p-4 duration-300 hover:scale-105"
          >
            <Link href={teacher.link} className="w-full">
              <ul className="flex flex-row items-center justify-between gap-2">
                <h2 className="text-lg font-bold">{teacher?.formattedName}</h2>
                <LinkIcon className="text-gray-500 opacity-0 duration-300 hover:text-gray-700 group-hover:opacity-100" />
              </ul>
              <p
                className={`text-sm ${
                  teacher?.avgRating >= 3.5
                    ? "text-green-700"
                    : teacher?.avgRating <= 2.5
                      ? "text-red-700"
                      : "text-yellow-700"
                }`}
              >
                {teacher.avgRating >= 4.5
                  ? "Overwhelmingly Positive"
                  : teacher.avgRating >= 3.5
                    ? "Very Positive"
                    : teacher.avgRating >= 3
                      ? "Mostly Positive"
                      : teacher.avgRating >= 2
                        ? "Mixed"
                        : "MostlyNegative"}{" "}
                <span className="text-sm text-gray-500">
                  ({teacher.numRatings})
                </span>
              </p>
              <ul className="flex flex-row items-center justify-between gap-2">
                <li className="flex flex-row items-center gap-1 text-lg font-bold text-gray-500">
                  <IoStar /> {teacher.avgRating}
                </li>
                <li className="flex flex-row items-center gap-1 text-lg font-bold text-gray-500">
                  <IoShield /> {teacher.avgDifficulty}
                </li>
                <li className="flex flex-row items-center gap-1 text-lg font-bold text-gray-500">
                  <IoRepeat /> {Math.round(teacher.wouldTakeAgainPercent)}%
                </li>
              </ul>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RateMyProfessors;
