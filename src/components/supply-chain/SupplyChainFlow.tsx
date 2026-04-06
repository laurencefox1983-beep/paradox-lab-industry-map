'use client';
import { useCallback, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { SupplyChain, NodeTier } from '@/types/supply-chain';
import { fmtPct } from '@/lib/utils/cn';
import Link from 'next/link';

const tierColors: Record<NodeTier, { bg: string; border: string; text: string }> = {
  upstream: { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af' },
  focal: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e' },
  downstream: { bg: '#f3e8ff', border: '#8b5cf6', text: '#5b21b6' },
  customer: { bg: '#d1fae5', border: '#10b981', text: '#065f46' },
};

const tierLabels: Record<NodeTier, string> = {
  upstream: '上游供應商',
  focal: '核心企業',
  downstream: '下游客戶',
  customer: '終端整合',
};

function ChainNode({ data }: { data: {
  ticker: string; name: string; tier: NodeTier; category: string;
  priceChangePct: number; marketCap: number;
}}) {
  const colors = tierColors[data.tier];
  const isUp = data.priceChangePct >= 0;

  return (
    <div style={{
      background: colors.bg,
      border: `2px solid ${colors.border}`,
      color: colors.text,
      borderRadius: 8,
      padding: '8px 12px',
      minWidth: 120,
      maxWidth: 160,
      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
    }}>
      <Handle type="target" position={Position.Left} style={{ background: colors.border }} />
      <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 2 }}>{data.category}</div>
      <div style={{ fontWeight: 700, fontSize: 13 }}>{data.ticker}</div>
      <div style={{ fontSize: 11, opacity: 0.85, marginBottom: 4 }}>{data.name}</div>
      <div style={{ fontSize: 11, fontWeight: 600, color: isUp ? '#16a34a' : '#dc2626' }}>
        {isUp ? '+' : ''}{data.priceChangePct.toFixed(2)}%
      </div>
      <Handle type="source" position={Position.Right} style={{ background: colors.border }} />
    </div>
  );
}

const nodeTypes = { chainNode: ChainNode };

// Compute positions using tier-based layout
function computeLayout(chain: SupplyChain) {
  const tierOrder: NodeTier[] = ['upstream', 'focal', 'downstream', 'customer'];
  const grouped: Record<NodeTier, typeof chain.nodes> = {
    upstream: [], focal: [], downstream: [], customer: [],
  };
  chain.nodes.forEach(n => grouped[n.tier].push(n));

  const TIER_X_GAP = 280;
  const NODE_Y_GAP = 120;

  const nodes: Node[] = [];
  tierOrder.forEach((tier, col) => {
    const group = grouped[tier];
    const startY = -(group.length - 1) * NODE_Y_GAP / 2;
    group.forEach((n, row) => {
      nodes.push({
        id: n.id,
        type: 'chainNode',
        position: n.position ?? { x: col * TIER_X_GAP, y: startY + row * NODE_Y_GAP },
        data: {
          ticker: n.ticker,
          name: n.name,
          tier: n.tier,
          category: n.category,
          priceChangePct: n.priceChangePct,
          marketCap: n.marketCap,
        },
      });
    });
  });
  return nodes;
}

export function SupplyChainFlow({ chain }: { chain: SupplyChain }) {
  const initialNodes = useMemo(() => computeLayout(chain), [chain]);
  const initialEdges: Edge[] = useMemo(() => chain.edges.map(e => ({
    id: e.id,
    source: e.source,
    target: e.target,
    label: e.label,
    animated: e.animated ?? false,
    style: { stroke: '#94a3b8', strokeWidth: 1.5 },
    labelStyle: { fontSize: 10, fill: '#64748b' },
    labelBgStyle: { fill: '#f8fafc', fillOpacity: 0.9 },
  })), [chain]);

  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-[600px] rounded-xl border border-(--color-border) overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={true}
        nodesConnectable={false}
        elementsSelectable={true}
      >
        <Background color="#94a3b8" gap={24} size={0.5} />
        <Controls showInteractive={false} />
        <MiniMap nodeColor={n => tierColors[(n.data as { tier: NodeTier }).tier]?.border ?? '#94a3b8'} />
      </ReactFlow>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
        {(Object.entries(tierColors) as [NodeTier, typeof tierColors.focal][]).map(([tier, c]) => (
          <span key={tier} className="flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border font-medium"
            style={{ background: c.bg, borderColor: c.border, color: c.text }}>
            {tierLabels[tier]}
          </span>
        ))}
      </div>
    </div>
  );
}
