-- Filter projects functions
CREATE OR REPLACE FUNCTION filter_projects(
  p_group TEXT,
  p_contributions TEXT,
  p_query TEXT,
  p_page INTEGER DEFAULT 1,
  p_page_size INTEGER DEFAULT 10,
  p_min_stars INTEGER DEFAULT NULL,
  p_max_stars INTEGER DEFAULT NULL,
  p_language TEXT DEFAULT NULL,
  p_seed INTEGER DEFAULT NULL
)
RETURNS TABLE (
  project_data JSONB,
  total_count BIGINT
) AS $$
DECLARE
  v_offset INTEGER;
  v_limit INTEGER;
BEGIN
  v_offset := (p_page - 1) * p_page_size;
  v_limit := p_page_size;

  -- Set the seed if provided
  IF p_seed IS NOT NULL THEN
    PERFORM setseed(p_seed::float / 2147483647);
  END IF;

  RETURN QUERY
  WITH filtered_projects AS (
    SELECT *,
           CASE WHEN p_seed IS NOT NULL 
                THEN random() 
                ELSE 0 END AS random_order
    FROM projects
    WHERE 
      groups ILIKE '%' || p_group || '%'
      AND contributions ILIKE '%' || p_contributions || '%'
      AND (
        name ILIKE '%' || p_query || '%'
        OR description ILIKE '%' || p_query || '%'
      )
      AND (p_min_stars IS NULL OR stars_count >= p_min_stars)
      AND (p_max_stars IS NULL OR stars_count <= p_max_stars)
      AND (p_language IS NULL OR languages ILIKE '%' || p_language || '%')
  ),
  counted_projects AS (
    SELECT COUNT(*) AS total_count
    FROM filtered_projects
  )
  SELECT 
    row_to_json(fp.*)::JSONB AS project_data,
    cp.total_count
  FROM 
    filtered_projects fp,
    counted_projects cp
  ORDER BY 
    CASE 
      WHEN p_seed IS NOT NULL THEN fp.random_order
      ELSE fp.id  -- Default ordering if no seed is provided
    END
  LIMIT v_limit
  OFFSET v_offset;
END;
$$ LANGUAGE plpgsql;