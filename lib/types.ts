export type PipelineStage =
  | {
      $search: {
        index: string
        text: {
          query: string
          fuzzy: object
          path: {
            wildcard: string
          }
        }
      }
    }
  | {
      $skip: number
    }
  | {
      $limit: number
    }
