import { FaGithub } from 'react-icons/fa';

function GitHub() {
    return (
        <>
            <a
                href="https://github.com/fzaca/challenge-mercado-libre"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 right-4"
                aria-label="GitHub repository"
            >
                <FaGithub size={30} className="text-primary hover:text-primary-focus" />
            </a>
        </>
    )
}

export default GitHub;