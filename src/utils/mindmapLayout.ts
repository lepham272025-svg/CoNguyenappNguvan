import { MindMapNode, MindMapLayout } from '../types';

export function calculateLayout(
  nodes: MindMapNode[],
  layout: MindMapLayout
): MindMapNode[] {
  if (nodes.length === 0) return [];

  const root = nodes.find((n) => n.parentId === null) || nodes[0];
  const mainBranches = nodes.filter((n) => n.parentId === root.id);

  const updatedNodes: MindMapNode[] = [];
  const rootNode: MindMapNode = { ...root, x: 0, y: 0, level: 0 };
  updatedNodes.push(rootNode);

  const getSubbranches = (parentId: string) =>
    nodes.filter((n) => n.parentId === parentId);

  if (layout === 'radial') {
    // Tỏa tròn: 360 degrees distribution
    const numBranches = mainBranches.length;
    const radius1 = 280;
    const radius2 = 490;

    mainBranches.forEach((branch, index) => {
      const angle = (index / numBranches) * 2 * Math.PI - Math.PI / 2;
      const bx = Math.round(radius1 * Math.cos(angle));
      const by = Math.round(radius1 * Math.sin(angle));

      const updatedBranch: MindMapNode = { ...branch, x: bx, y: by, level: 1 };
      updatedNodes.push(updatedBranch);

      const subbranches = getSubbranches(branch.id);
      const subCount = subbranches.length;
      if (subCount > 0) {
        const spreadAngle = Math.min(Math.PI / 3, (2 * Math.PI) / (numBranches * 1.5));
        subbranches.forEach((sub, sIdx) => {
          const offsetAngle =
            subCount === 1
              ? 0
              : -spreadAngle / 2 + (sIdx / (subCount - 1)) * spreadAngle;
          const subAngle = angle + offsetAngle;
          const sx = Math.round(radius2 * Math.cos(subAngle));
          const sy = Math.round(radius2 * Math.sin(subAngle));

          updatedNodes.push({ ...sub, x: sx, y: sy, level: 2 });
        });
      }
    });
  } else if (layout === 'horizontal_tree') {
    // Cây ngang: Root on left (x=0), main branches on right (x=280), subbranches further right (x=550)
    let currentY = 0;
    const branchSpacing = 160;

    // Calculate total height needed for subbranches
    let totalHeight = 0;
    mainBranches.forEach((branch) => {
      const subs = getSubbranches(branch.id);
      totalHeight += Math.max(subs.length * 75, branchSpacing);
    });

    let startY = -totalHeight / 2 + 50;

    mainBranches.forEach((branch) => {
      const subs = getSubbranches(branch.id);
      const branchHeight = Math.max(subs.length * 75, branchSpacing);
      const branchY = startY + branchHeight / 2;

      updatedNodes.push({
        ...branch,
        x: 280,
        y: Math.round(branchY),
        level: 1,
      });

      if (subs.length > 0) {
        const subStartY = branchY - ((subs.length - 1) * 70) / 2;
        subs.forEach((sub, sIdx) => {
          updatedNodes.push({
            ...sub,
            x: 560,
            y: Math.round(subStartY + sIdx * 70),
            level: 2,
          });
        });
      }

      startY += branchHeight;
    });
  } else if (layout === 'vertical_tree') {
    // Cây dọc: Root on top (y=0), main branches below (y=200), subbranches below (y=420)
    let totalWidth = 0;
    const branchWidth = 240;

    mainBranches.forEach((branch) => {
      const subs = getSubbranches(branch.id);
      totalWidth += Math.max(subs.length * 160, branchWidth);
    });

    let startX = -totalWidth / 2 + 100;

    mainBranches.forEach((branch) => {
      const subs = getSubbranches(branch.id);
      const currentBranchWidth = Math.max(subs.length * 160, branchWidth);
      const branchX = startX + currentBranchWidth / 2;

      updatedNodes.push({
        ...branch,
        x: Math.round(branchX),
        y: 200,
        level: 1,
      });

      if (subs.length > 0) {
        const subStartX = branchX - ((subs.length - 1) * 160) / 2;
        subs.forEach((sub, sIdx) => {
          updatedNodes.push({
            ...sub,
            x: Math.round(subStartX + sIdx * 160),
            y: 400,
            level: 2,
          });
        });
      }

      startX += currentBranchWidth;
    });
  } else if (layout === 'bilateral') {
    // Hai phía: Half branches left, half branches right
    const half = Math.ceil(mainBranches.length / 2);
    const rightBranches = mainBranches.slice(0, half);
    const leftBranches = mainBranches.slice(half);

    // Layout right branches
    let rightHeight = 0;
    rightBranches.forEach((b) => {
      const subs = getSubbranches(b.id);
      rightHeight += Math.max(subs.length * 75, 150);
    });
    let startYRight = -rightHeight / 2 + 50;

    rightBranches.forEach((branch) => {
      const subs = getSubbranches(branch.id);
      const bHeight = Math.max(subs.length * 75, 150);
      const by = startYRight + bHeight / 2;

      updatedNodes.push({ ...branch, x: 280, y: Math.round(by), level: 1 });

      if (subs.length > 0) {
        const subStartY = by - ((subs.length - 1) * 70) / 2;
        subs.forEach((sub, sIdx) => {
          updatedNodes.push({
            ...sub,
            x: 540,
            y: Math.round(subStartY + sIdx * 70),
            level: 2,
          });
        });
      }
      startYRight += bHeight;
    });

    // Layout left branches
    let leftHeight = 0;
    leftBranches.forEach((b) => {
      const subs = getSubbranches(b.id);
      leftHeight += Math.max(subs.length * 75, 150);
    });
    let startYLeft = -leftHeight / 2 + 50;

    leftBranches.forEach((branch) => {
      const subs = getSubbranches(branch.id);
      const bHeight = Math.max(subs.length * 75, 150);
      const by = startYLeft + bHeight / 2;

      updatedNodes.push({ ...branch, x: -280, y: Math.round(by), level: 1 });

      if (subs.length > 0) {
        const subStartY = by - ((subs.length - 1) * 70) / 2;
        subs.forEach((sub, sIdx) => {
          updatedNodes.push({
            ...sub,
            x: -540,
            y: Math.round(subStartY + sIdx * 70),
            level: 2,
          });
        });
      }
      startYLeft += bHeight;
    });
  }

  // Preserve any remaining leaves if there are deeper levels
  const placedIds = new Set(updatedNodes.map((n) => n.id));
  nodes.forEach((n) => {
    if (!placedIds.has(n.id)) {
      updatedNodes.push(n);
    }
  });

  return updatedNodes;
}

export function getMindMapBoundingBox(nodes: MindMapNode[]) {
  if (nodes.length === 0) {
    return { minX: -400, minY: -300, maxX: 400, maxY: 300, width: 800, height: 600, centerX: 0, centerY: 0 };
  }

  // Node width estimation: central ~240px, branch ~200px, subbranch ~180px
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  nodes.forEach((node) => {
    const halfW = node.level === 0 ? 130 : node.level === 1 ? 110 : 95;
    const halfH = node.level === 0 ? 60 : 45;

    minX = Math.min(minX, node.x - halfW);
    maxX = Math.max(maxX, node.x + halfW);
    minY = Math.min(minY, node.y - halfH);
    maxY = Math.max(maxY, node.y + halfH);
  });

  const padding = 80;
  minX -= padding;
  minY -= padding;
  maxX += padding;
  maxY += padding;

  const width = Math.max(800, maxX - minX);
  const height = Math.max(600, maxY - minY);
  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  return { minX, minY, maxX, maxY, width, height, centerX, centerY };
}

export function sanitizeFileName(title: string): string {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'so_do_tu_duy';
}
