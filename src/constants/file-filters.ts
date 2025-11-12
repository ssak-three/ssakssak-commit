const EXCLUDED_FILES = {
  JSON_FILES: [/\.json$/],

  YAML_FILES: [/\.ya?ml$/],

  LOCK_FILES: [/\.lock$/, /.*-lock\./, /^.*\.lock$/],

  MARKDOWN_FILES: [/\.md$/],

  CONFIG_FILES: [
    /^\..*rc$/,
    /\.config\.(js|ts)$/,
    ".prettierrc",
    ".editorconfig",
  ],

  ENV_FILES: [/^\.env/],

  DOCKER_FILES: ["Dockerfile", "docker-compose.yml", ".dockerignore"],

  GIT_FILES: [".gitignore", ".gitattributes"],

  IDE_FOLDERS: [/^\.vscode\//, /^\.idea\//],

  GITHUB_FOLDERS: [/^\.github\//],

  IMAGE_FILES: [/\.(png|jpg|jpeg|gif|svg|ico)$/],

  META_FILES: ["LICENSE", "robots.txt", "sitemap.xml", "favicon.ico"],
};

const EXCLUDED_FILES_LIST = [
  ...EXCLUDED_FILES.JSON_FILES,
  ...EXCLUDED_FILES.YAML_FILES,
  ...EXCLUDED_FILES.LOCK_FILES,
  ...EXCLUDED_FILES.MARKDOWN_FILES,
  ...EXCLUDED_FILES.CONFIG_FILES,
  ...EXCLUDED_FILES.ENV_FILES,
  ...EXCLUDED_FILES.DOCKER_FILES,
  ...EXCLUDED_FILES.GIT_FILES,
  ...EXCLUDED_FILES.IDE_FOLDERS,
  ...EXCLUDED_FILES.GITHUB_FOLDERS,
  ...EXCLUDED_FILES.IMAGE_FILES,
  ...EXCLUDED_FILES.META_FILES,
];

export { EXCLUDED_FILES_LIST };
